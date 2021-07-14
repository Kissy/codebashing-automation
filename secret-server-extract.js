var secretRows = document.querySelectorAll('#secretTable_2122 tr.ui-row-ltr');
var allRows = secretRows.length;
var currentRowIndex = 0;
var results = [];

function processNextRow() {
    var row = secretRows[currentRowIndex];
    var item = {};

    $.ajax({
            dataType: "json",
            url: "dashboard/DashboardServices.asmx/LoadSecretView",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                secretId: row.id
            }),
            success: function(d) {
                var g = d.d;
                item['Secret'] = row.children[1].textContent;
                item['Dossier'] = row.children[2].textContent;
                var passwordId = null;
                for (var j=0; j < g.items.length; j++) {
                    if (g.items[j].label == 'Password') {
                        passwordId = g.items[j].secretItemId;
                    } else if (g.items[j].value) {
                        item[g.items[j].label] = g.items[j].value;
                    }
                }

                if (passwordId != null) {
                     $.ajax({
                         dataType: "json",
                         url: "ajax/ajaxservices.asmx/GetSecretItemValue",
                         type: "POST",
                         data: JSON.stringify({
                             secretItemId: passwordId,
                             isEditMode: false,
                             auditAction: "unmask"
                         }),
                         contentType: "application/json; charset=utf-8",
                         success: function(e) {
                             item['Password'] = e.d.SecretItemValue;
                             results.push(item);
                             currentRowIndex++;
                             if (currentRowIndex < allRows) {
                                processNextRow();
                             } else {
                                displayResults();
                             }
                         }
                     });
                 } else {
                    currentRowIndex++;
                     if (currentRowIndex < allRows) {
                        processNextRow();
                     } else {
                        displayResults();
                     }
                 }
            }
        });
}

function displayResults() {
    console.log(JSON.stringify(results));
}

processNextRow();