

let authHelper = {
    setJWTToken: function (jwt, reference) {
        let userData;
        try {
            userData = JSON.parse(localStorage.getItem("auth"))
        } catch (e) {
            userData = {};
        }

        userData.jwt = jwt;
        userData.reference = reference;
        localStorage.setItem("auth", JSON.stringify(userData))
        return true
    },

    setUserToLocalStorage: function (userProfile) {
        console.log(userProfile)
        let profileData = {}
        try {
            profileData = JSON.parse(localStorage.getItem("profile")) ?? {}
            console.log(profileData)
        } catch (err) {
            profileData = {};
        }


        console.log(profileData)

        profileData.user = userProfile;
        localStorage.setItem("profile", JSON.stringify(profileData))
        return true;
    },
 
}

export default authHelper