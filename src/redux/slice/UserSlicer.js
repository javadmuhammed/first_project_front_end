
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../../axios/instance'
import { const_data } from '../../CONST/const_data'


export let getUserByJwtToken = createAsyncThunk("user/get_user_by_jwt", async (payload) => {  
    try {
        let user = await instance.get(const_data.API_ENDPOINT.get_user_by_jwt + "/" + payload.jwt)
        // alert("Step 2")
        console.log(user)
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
            isLoading: true,
            user: {}
        },
        reducers: {
            setUserAsLogged: (state, action) => {
                state.isLoading = false;
                state.isLogged = true;
            },
            updateUser: (state, action) => {
                let stateUser = action.payload.user
                state.user = stateUser
            },
            userLogout: (state, action) => {
                state.isLoading = false
                state.isLogged = false;
                state.user = {}
                localStorage.setItem("auth", "");
            }
        },
        extraReducers: (builder) => {
            builder.addCase(getUserByJwtToken.fulfilled, (state, action) => {
                let response = action.payload?.data;
                console.log(response);
                

                if (response?.status) {
                    state.isLoading = false;
                    state.isLogged = true;
                    state.user = response?.user
                }else{
                    state.isLoading = false;
                    state.isLogged = false;
                    state.user = {}
                }
            }).addCase(getUserByJwtToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isLogged = false;
                state.user = {}
            })
        }

    }
)


export let userAction = userSlicer.actions;

export default userSlicer.reducer