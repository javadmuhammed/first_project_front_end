
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../axios/instance'
import { const_data } from '../../CONST/const_data'


export let getUserByJwtToken = createAsyncThunk("user/get_user_by_jwt", async (payload) => {
    console.log(payload.jwt)
    // alert(payload.jwt)
    try {
        let user = await instance.get(const_data.API_ENDPOINT.get_user_by_jwt + "/" + payload.jwt) 
        return user
    } catch (e) { 
        return null;
    }
})


let userSlicer = createSlice(
    {
        name: "user",
        initialState: {
            isLogged: false,
            user: {}
        },
        reducers: {
            setUserAsLogged: (state, action) => {
                state.isLogged = true;
            },
            updateUser: (state, action) => {
                let stateUser = action.payload.user
                state.user = stateUser
            },
            userLogout: (state, action) => {
                state.isLogged = false;
                state.user = {}
                localStorage.setItem("auth", "");
            }
        },
        extraReducers: (builder) => {
            builder.addCase(getUserByJwtToken.fulfilled, (state, action) => {
                let response = action.payload?.data; 
                console.log(response.user)
                if (response?.status) {

                    state.isLogged = true;
                    state.user = response?.user
                }
            })
        }

    }
)


export let userAction = userSlicer.actions;

export default userSlicer.reducer