Ext.define('MobileJudge.view.stats.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stats',

    windows: {},
    model: null,
    deleteRecord: {},

    init: function (view) {
        this.model = view.getViewModel();
        var data = null;
        var text = 'Accept';
        var dataArray = null;
        var status = null;
    },

    returnData: function () {
        return this.dataArray;
    },

    getAverage: function (data) {
        var average = 0;
        var count = 0;

        data.forEach(function (item) {
            if ((item.accepted && item.accepted == true)) {
                if (item.grade)
                    average = average + item.grade;
                else if (item.gradeAverage)
                    average = average + item.gradeAverage;
                else
                    average = average + item.gradeAverage;
                count++;
            }
        });
        return (average / count).toFixed(2) != null ? (average / count).toFixed(2) : 0;
    },

    getData: function (data) {
        Ext.Ajax.request({
            url: '/api/views_table/judges',
            success: function (response) {
                var data = JSON.parse(response.responseText)
                data.judges.forEach(function (judge) {
                    data.students.forEach(function (student) {
                        if (student.judgeId == judge.id)
                            student.judgeName = judge.fullName;
                    })
                });
                data.students.forEach(function (student) {
                    var tempAverage = 1;
                    data.grades.forEach(function (grade) {
                        if (student.judgeName == grade.judge && student.fullName == grade.student && student.project == grade.projectName) {
                            student.gradeAverage = student.gradeAverage + grade.grade;
                            tempAverage++;
                        }
                    });
                    student.gradeAverage = student.gradeAverage / tempAverage;
                });

                return data;
                Ext.getStore('mockData').data = data.students;
                Ext.getStore('mockData').reload();
            },
            failure: this.updateError,
            jsonData: data,
            disableCaching: true,
            method: 'POST'
        });
    },
    loadStudentsGrades: function () {
        var students = Ext.getStore("students").data.items;
        var grades = Ext.getStore("studentGrades").data.items;

        students.forEach(function (student) {
            var counter = 0;

            grades.forEach(function (grade) {

                if (grade.data.studentId == 1358788)//student.id)
                {
                    student.data.grade = student.data.grade + grade.data.value;
                    counter++;
                }
            });
            student.data.grade = student.data.grade / counter;
        });
        Ext.getStore("students").loadData(students, [false]);
    }
});
