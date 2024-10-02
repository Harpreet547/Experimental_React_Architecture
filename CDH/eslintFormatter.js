module.exports = function (results, context) {
    // accumulate the errors and warnings
    var summary = results.reduce((seq, current) => {
        seq.errors += current.errorCount;
        seq.warnings += current.warningCount;
        return seq;
    },
        { errors: 0, warnings: 0 }
    );

    var newIssues = summary.warnings + summary.errors;
    return newIssues;
};
