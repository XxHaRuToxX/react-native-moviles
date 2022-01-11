import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseURL='http://192.168.10.30:8080/api';
const baseURL='https://cafebackend-react-native.herokuapp.com/api';

const cafeApi=axios.create({baseURL});

/* middleware */
cafeApi.interceptors.request.use(

    async(config)=>{
        const token=await AsyncStorage.getItem('token');
        if(token){
            config.headers['x-token'] = token;
        }
        return config;
    }
)




export default cafeApi;

