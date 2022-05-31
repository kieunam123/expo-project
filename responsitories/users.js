import axios from "axios"

const getUserDetail = async () => {
    try {
        let response = await axios.get('https://randomuser.me/api')
        if (response.status != 200) {
            throw 'Failed request'
        }
        let userData1 = response.data.results[0]
        let user = {}
        user.name = `${userData1.name.first} ${userData1.name.last}`
        user.email = userData1.email ?? 'null'
        user.phone = userData1.phone ?? 'null'
        user.gender = userData1.gender ?? 'null'
        user.age = userData1.dob.age ?? 'null'
        user.regdate = new Date(userData1.registered.date) ?? 'null'
        user.national = userData1.location.country ?? 'null'
        user.city = userData1.location.city ?? 'null'
        return user
    }
    catch (error) {
        throw error
    }
}

export default{
    getUserDetail,
}