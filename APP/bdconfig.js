const OracleDB = require('oracledb');

const bd_data_sisred = {
    user: 'SISREDDEF',
    password: 'SISREDDEF01',
    connectString: '192.168.0.27:1521/BDCEM03'
};

const bd_data_sisplay = {
    user: 'SISPLAY',
    password: 'SISPLAY01',
    connectString: '192.168.0.69:1521/BDSISPDE'
};


async function bd_connect() {
    try{
        await OracleDB.createPool({
            user: bd_data_sisred.user,
            password: bd_data_sisred.password,
            connectString: bd_data_sisred.connectString
        })
    }
    catch(error){
        console.log('Error de conexión',error);
    }
};

module.exports = bd_connect;