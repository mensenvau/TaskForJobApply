let data = [{
    Name: "O'tkir Xo'jayev",
    Age: "23",
    Level: "none"
}, {
    Name: "test 2",
    Age: "2",
    Level: "102"
},
{
    Name: "Test 2",
    Age: "20",
    Level: "beginner"
}]

// We could have used a database connection instead, but it was left as a test.
function GetUser(id) {
    if (data.length > id && id >= 0) {
        return data[id];
    }
    return { msg: "not found user!" }
}

function GetUsersAll() {
    return data;
}



module.exports = { GetUser, GetUsersAll }