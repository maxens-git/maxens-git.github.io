window.onload = function () {
    deleteTempCookies();
    buildList();
}

function deleteCard(cardNo) {
    document.getElementById("card" + cardNo).remove();
    document.cookie = cardNo + "provName=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "doh=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "dns1v4=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "dns2v4=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "dns1v6=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "dns2v6=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "serverUrl=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "exclWifi=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "useWifi=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "useCell=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = cardNo + "lockProfile=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
}

function editCard(cardNo) {
    var d = new Date();
    d.setTime(d.getTime() + (86400000)); //expires in 24h
    var expires = "expires="+ d.toUTCString();
    document.cookie = "editSelected=" + cardNo + ";" + expires + ";path=/; SameSite=Strict; Secure";

    window.location.href = 'tool.html';
}

function buildList() {
    var parent = document.getElementById("dynamicList");

    for (var i = 0; i < getCookie("runningNo"); i++) {
        if (getCookie(i + "provName") != "") {
            var carddiv = document.createElement("div");
            carddiv.classList.add("w3-card");
            carddiv.id = "card" + i;

            var header = document.createElement("header");
            header.classList.add("w3-container");
            header.classList.add("bar-color");

            var headertext = document.createElement("h3");
            headertext.classList.add("w3-left");
            headertext.appendChild(document.createTextNode(decodeURIComponent(getCookie(i + "provName"))));

            var headerdel = document.createElement("button");
            headerdel.classList.add("w3-button");
            headerdel.classList.add("w3-red");
            headerdel.classList.add("w3-right")
            headerdel.innerHTML = "X";
            headerdel.setAttribute("onclick", 'deleteCard(' + i + ')');

            var headeredit = document.createElement("button");
            headeredit.classList.add("w3-button");
            headeredit.classList.add("w3-dark-gray");
            headeredit.classList.add("w3-right")
            headeredit.innerHTML = "Edit";
            headeredit.setAttribute("onclick", 'editCard(' + i + ')');

            var infocontainer = document.createElement("div");
            infocontainer.classList.add("w3-container");

            var infop = document.createElement("p");

            var infostring = "Connection type: ";
            if (getCookie(i + "doh") == "true") {
                infostring += "DNS-over-HTTPS";
            } else {
                infostring += "DNS-over-TLS";
            }
            infop.appendChild(document.createTextNode(infostring));
            infop.appendChild(document.createElement("br"));
            var dns1v4 = getCookie(i + "dns1v4");
            var dns2v4 = getCookie(i + "dns2v4");
            var dns1v6 = getCookie(i + "dns1v6");
            var dns2v6 = getCookie(i + "dns2v6");
            var exclWifi = decodeURIComponent(getCookie(i + "exclWifi"));

            if (dns1v4 != "") {
                infostring = "Primary IPv4 DNS Server: " + getCookie(i + "dns1v4");
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }
            if (dns2v4 != "") {
                infostring = "Secondary IPv4 DNS Server: " + dns2v4;
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }
            if (dns1v6 != "") {
                infostring = "Primary IPv6 DNS Server: " + dns1v6;
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }
            if (dns2v6 != "") {
                infostring = "Secondary IPv6 DNS Server: " + dns2v6;
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }

            infostring = "Server Address: " + getCookie(i + "serverUrl");
            infop.appendChild(document.createTextNode(infostring));
            infop.appendChild(document.createElement("br"));

            if (exclWifi != "") {
                infostring = "Excluded WiFi SSIDs: " + exclWifi;
                infop.appendChild(document.createTextNode(infostring));
                infop.appendChild(document.createElement("br"));
            }

            infostring = "";

            if (getCookie(i + "useWifi") == "true") {
                infostring += "Enabled on WiFi. ";
            }
            if (getCookie(i + "useCell") == "true") {
                infostring += "Enabled on Cellular. ";
            }
            if (getCookie(i + "lockProfile" == "true")) {
                infostring += "Disablement prohibited. ";
            }
            infop.appendChild(document.createTextNode(infostring));

            header.appendChild(headertext);
            header.appendChild(headerdel);
            header.appendChild(headeredit);
            carddiv.appendChild(header);
            infocontainer.appendChild(infop);
            carddiv.appendChild(infocontainer);
            parent.appendChild(carddiv);
            document.getElementById("downloadBtn").disabled = false;
        }
    }
}

function deleteTempCookies() {
    document.cookie = "provName=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = "doh=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = "dns1v4=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = "dns2v4=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = "dns1v6=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = "dns2v6=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    document.cookie = "serverUrl=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure";
    }
}

function getRegDNS(iterator) {
    var dns1v4 = getCookie(iterator + "dns1v4");
    var dns2v4 = getCookie(iterator + "dns2v4");
    var dns1v6 = getCookie(iterator + "dns1v6");
    var dns2v6 = getCookie(iterator + "dns2v6");
    var ip4format = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var ip6format = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

    var returnstring = "<key>ServerAddresses</key>\n<array>\n";
    var dnsOverride = false;

    if (ip6format.test(dns1v6)) {
        dnsOverride = true;
        returnstring += "<string>" + dns1v6 + "</string>\n";
    }
    if (ip6format.test(dns2v6)) {
        dnsOverride = true;
        returnstring += "<string>" + dns2v6 + "</string>\n";
    }

    if (ip4format.test(dns1v4)) {
        dnsOverride = true;
        returnstring += "<string>" + dns1v4 + "</string>\n";
    }
    if (ip4format.test(dns2v4)) {
        dnsOverride = true;
        returnstring += "<string>" + dns2v4 + "</string>\n";
    }

    if (dnsOverride) {
        returnstring += "</array>\n";
        return returnstring;
    } else {
        return "";
    }
}

function saveDynamicDataToFile() {
    var fileString = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    fileString += "<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n";
    fileString += "<plist version=\"1.0\">\n";
    fileString += "<dict>\n";
    fileString += "<key>PayloadContent</key>\n";
    fileString += "<array>\n";

    //DNS settings start
    for (var i = 0; i < getCookie("runningNo"); i++) {
        var provName = getCookie(i + "provName");
        if (provName != "") { //This check is to avoid empty configurations leftover by deletion.
            var encValue = null;
            if (getCookie(i + "doh") == "true") {
                encValue = "HTTPS";
            } else {
                encValue = "TLS";
            }
            var exclWifi = decodeURIComponent(getCookie(i + "exclWifi"));

            fileString += "<dict>\n";
            fileString += "<key>DNSSettings</key>\n";
            fileString += "<dict>\n";
            fileString += "<key>DNSProtocol</key>\n";
            fileString += "<string>" + encValue + "</string>\n";
            fileString += getRegDNS(i);
            if (encValue == "HTTPS") {
                fileString += "<key>ServerURL</key>\n";
            } else {
                fileString += "<key>ServerName</key>\n";
            }
            fileString += "<string>" + getCookie(i + "serverUrl") + "</string>\n";
            fileString += "</dict>\n";
            fileString += "<key>OnDemandRules</key>\n";
            fileString += "<array>\n";
            if (exclWifi != "") {
                fileString += "<dict>\n";
                fileString += "<key>Action</key>\n";
                fileString += "<string>Disconnect</string>\n";
                fileString += "<key>SSIDMatch</key>\n"
                fileString += "<array>\n";
                exclWifi.split(/\s*,\s*/).forEach(function (wifiString) {
                    fileString += "<string>" + wifiString + "</string>\n";
                });
                fileString += "</array>\n";
                fileString += "</dict>\n";
            }
            if (getCookie(i + "useWifi") == "true") {
                fileString += "<dict>\n";
                fileString += "<key>Action</key>\n";
                fileString += "<string>Connect</string>\n";
                fileString += "<key>InterfaceTypeMatch</key>\n";
                fileString += "<string>WiFi</string>\n";
                fileString += "</dict>\n";
            }
            if (getCookie(i + "useCell") == "true") {
                fileString += "<dict>\n";
                fileString += "<key>Action</key>\n";
                fileString += "<string>Connect</string>\n";
                fileString += "<key>InterfaceTypeMatch</key>\n";
                fileString += "<string>Cellular</string>\n";
                fileString += "</dict>\n";
            }
            fileString += "<dict>\n";
            fileString += "<key>Action</key>\n";
            fileString += "<string>Disconnect</string>\n";
            fileString += "</dict>\n";
            fileString += "</array>\n";
            fileString += "<key>PayloadDescription</key>\n";
            fileString += "<string>Configures device to use " + provName + " Encrypted DNS over " + encValue + "</string>\n";
            fileString += "<key>PayloadDisplayName</key>\n";
            fileString += "<string>" + provName + " DNS over " + encValue + "</string>\n";
            fileString += "<key>PayloadIdentifier</key>\n";
            fileString += "<string>com.apple.dnsSettings.managed." + uuidv4() + "</string>\n";
            fileString += "<key>PayloadType</key>\n";
            fileString += "<string>com.apple.dnsSettings.managed</string>\n";
            fileString += "<key>PayloadUUID</key>\n";
            fileString += "<string>" + uuidv4() + "</string>\n";
            fileString += "<key>PayloadVersion</key>\n";
            fileString += "<integer>1</integer>\n";
            fileString += "<key>ProhibitDisablement</key>\n";
            if (getCookie(i + "lockProfile") == "true") {
                fileString += "<true/>\n";
            } else {
                fileString += "<false/>\n";
            }
            fileString += "</dict>\n";
        }
    }
    //DNS settings end

    fileString += "</array>\n";
    fileString += "<key>PayloadDescription</key>\n";
    fileString += "<string>Adds different encrypted DNS configurations to Big Sur and iOS 14 based systems</string>\n";
    fileString += "<key>PayloadDisplayName</key>\n";
    fileString += "<string>Encrypted DNS (DoH, DoT)</string>\n";
    fileString += "<key>PayloadIdentifier</key>\n";
    fileString += "<string>com.notjakob.apple-dns." + uuidv4() + "</string>\n";
    fileString += "<key>PayloadRemovalDisallowed</key>\n";
    fileString += "<false/>\n";
    fileString += "<key>PayloadType</key>\n";
    fileString += "<string>Configuration</string>\n";
    fileString += "<key>PayloadUUID</key>\n";
    fileString += "<string>" + uuidv4() + "</string>\n";
    fileString += "<key>PayloadVersion</key>\n";
    fileString += "<integer>1</integer>\n";
    fileString += "</dict>\n";
    fileString += "</plist>";

    var blob = new Blob([fileString], {
        type: "application/octet-stream;charset=utf-8"
    });

    deleteAllCookies();

    saveAs(blob, "dns.mobileconfig");
}

function confirmDel() {
    if (confirm("This will delete all configurations on this page. Continue?") == true) {
        deleteAllCookies();
        window.location.reload();
    }
}
