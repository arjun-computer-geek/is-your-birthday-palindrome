// reversing string
var reverseStr = (str) => {
    var charList = str.split('');
    var reverseChar = charList.reverse();
    var reversedStr = reverseChar.join('');
    return reversedStr;
}

// checking palindorme
var checkPalindrome = (str) => {
    var reverse = reverseStr(str);

    return str === reverse;
}

// converting date to stirng and append the zero before it
var convertDateToStr = (date) => {
    var dateStr = { day: "", month: "", year: "" };
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

// we are making pridicting the all date formate and returning.
var getAllDateFormats = (date) => {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyyy, mmddyy, yymmdd];
}

// checking palindrome for all date formate
var checkPalindromeForAllDateFormats = (date) => {
    var listOfPalindromes = getAllDateFormats(date);

    var flag = false;
    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (checkPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

// function for the checking leap year
var isLeapYear = (year) => {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

// handling the feberuary with leap year and get next date
var getNextDate = (date) => {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

// function for the get next palindrome date
var getNextPalindromeDate = (date) => {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
}

// element's reference variables
var showBtn = document.querySelector('#show');
var dobInput = document.querySelector('#dob');
var resultDiv = document.querySelector("#output");

// click handler function
var clickHandler = (e) => {
    var bdayString = dobInput.value;

    if (bdayString !== '') {
        var date = bdayString.split('-');
        // console.log(date);
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2];

        var date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
        };


        // var dateStr = convertDateToStr(date);
        var list = checkPalindromeForAllDateFormats(date);
        console.log(list);
        if (list) {
            resultDiv.innerText = "your birthday is palindrome";
        }
        else {
            var [ctr, nextDate] = getNextPalindromeDate(date);
            resultDiv.innerText = `the next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}.You missed it by ${ctr} Days`
        }

    }
}

// adding eventlistener for the activate the show button
showBtn.addEventListener('click', clickHandler);
