// Bases de datos y externos
const dbconnect = require('./bdconfig');
const axios = require('axios');
const moment = require('moment');
const OracleDB = require('oracledb');
const operaciones = {};

operaciones.test = async function (colab){
    
    await dbconnect();
    const conexion = await OracleDB.getConnection();

    terminales = await conexion.execute(`SELECT * FROM (SELECT DSERIAL FROM DPM_TERMINALES WHERE RCODDATO = '2' AND KCODEMPRESA = '${colab}' AND DSERIAL IS NOT NULL ORDER BY DBMS_RANDOM.RANDOM)WHERE  ROWNUM <=1`);
    vendedores = await conexion.execute(`SELECT * FROM (SELECT UDOCUMENTO2 FROM persona WHERE DESTADO = 'A' AND RCODEMPRESA = '${colab}' AND UDOCUMENTO2 IS NOT NULL ORDER BY DBMS_RANDOM.RANDOM)WHERE  ROWNUM <=1`);
    pdvs = await conexion.execute(`SELECT * FROM (SELECT RPUNTOVENTA FROM AST_PUNTOVTA WHERE KCODEMPRESA = '${colab}' AND RCODDATO = '2' ORDER BY DBMS_RANDOM.RANDOM)WHERE  ROWNUM <=1`);
    
    await conexion.close();

    return {terminal: terminales.rows[0][0], pdv: pdvs.rows[0][0], vendedor: vendedores.rows[0][0]};
};

operaciones.sesion = async function (colab){
    const fecha = moment().format('DD/MM/YYYY:HH:mm:ss.SSS')
    const datasend =  {colaborador: colab, fechaHoraPeticion: fecha,  usuario: `AP11${colab}`, contrasena: `AP11${colab}`}
    const conspost = axios.post('http://10.110.129.30:9200/astroweb/v1/autenticacion',datasend)
    return conspost
}

module.exports = operaciones;