import * as actionTypes from "./actionTypes";


export const authStart=()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(authData)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:authData.idToken,
        userId:authData.localId
    }
}

export const authFail=(error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.LOGOUT
    }
}

export const tokenExpiration=(expiresIn)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(logout())
        },expiresIn*1000);
    }
}

export const setAuthRedirect=(path)=>{
    return {
        type:actionTypes.AUTH_REDIRECT_PATH,
        path:path
    }
}

export const checkSignup =()=>{
    return (dispatch)=>{
        const token = localStorage.getItem('token');

        if(!token){
            dispatch(logout());
        }else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'));

            const userId=localStorage.getItem('userId');
            if(expirationDate.getTime()>new Date().getTime()){
                const expiresIn=expirationDate.getTime()-new Date().getTime();
                dispatch(tokenExpiration(expiresIn/1000));
                dispatch(authSuccess({idToken:token,localId:userId}))

            }else{
                dispatch(logout());
            }
        }
    }
}

export const startAuthentication=(email,passwd,isSignup)=>{
    return async(dispatch)=>{
        const request={
            email:email,
            password:passwd,
            returnSecureToken:true
        }
        dispatch(authStart());
        try{
            let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBuVPEjB4Qp6g07XQYydAjLU3L93pbvMkQ';
            if(!isSignup){
                url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBuVPEjB4Qp6g07XQYydAjLU3L93pbvMkQ'
            }
            const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify(request)
            });
            const result=await response.json();
            if(result.error){
                throw result.error
            }
            const expirationDate= new Date(new Date().getTime()+result.expiresIn*1000);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('token',result.idToken);
            localStorage.setItem('userId',result.localId);
            dispatch(tokenExpiration(result.expiresIn));
            dispatch(authSuccess(result));
            
        }catch(err){
            dispatch(authFail(err))
        }

    }
}