module.exports = function (results, context) {
    // accumulate the errors and warnings
    var summary = results.reduce(
        function (seq, current) {
            seq.errors += current.errorCount;
            seq.warnings += current.warningCount;
            return seq;
        },
        { errors: 0, warnings: 0 }
    );

    // console.log(typeof summary.warnings);
    var newIssues = summary.warnings + summary.errors;
    return newIssues;

    if (newIssues > 0) {
        throw new Error("New issues found: " + newIssues);
    } else {
        console.log("No new issues found!");
        return;
    }
    if (summary.errors > 0 || summary.warnings > 0) {
        return (
            "Errors:" +
            summary.errors +
            ",Warnings:" +
            summary.warnings
        );
    }

    return "";
};
