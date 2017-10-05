var forbidden = require('restify').errors.ForbiddenError,
    notFound = require('restify').errors.NotFoundError,
    _ = require('lodash');

module.exports = function(server, db) {

    // Gets the grades for an individual student
    server.get(apiPrefix + '/grades/students', function (req, res, next) {
        if (!req.user || req.user.role !== 2) return next(new notFound('You don\'t have any students to grade'));

        db.students_by_judge.findAll({ //TODO: change this stored procedure
            where: {
                judgeId: req.user.id
            },
            order: 'fullName'
        }).then(function(students) {
            res.json(students.map(function(s) {
                return _.mapKeys(_.omit(s.dataValues, 'judgeId'), function(value, key) {
                    return key == 'studentId' ? 'id' : key;
                });
            }));
            next();
        });
    });

    // Gets the grades for an individual student
    server.get(apiPrefix + '/grades/judges', function (req, res, next) {
        if (!req.user) return next(new forbidden('You don\'t have access to grades'));

        var sendGrades = function(grades){
            res.json(grades);
            next();
        };

        switch (req.user.role) {
            case 2: // Judge
                db.grade.findAll({
                    attributes: ['studentId', 'questionId', 'value', 'comment', 'state'],
                    where: {
                        judgeId: req.user.id
                    }
                }).then(function(grades){
                    sendGrades(grades.map(function(g) {
                        return {
                            id: g.studentId + '-' + g.questionId,
                            state: g.state,
                            value: g.value,
                            comment: g.comment
                        };
                    }));
                });
                break;
            case 3: // Admin
                db.term.getActiveTerm().then(function(term){
                    db.grade.findAll({
                        where: {
                            termId: term.id
                        }
                    }).then(sendGrades);
                });
                break;
            default:
                return next(new forbidden('You don\'t have access to grades'));
        }
    });
};
