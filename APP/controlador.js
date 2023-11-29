// funciones
// envia datos a validar y recibe la respuesta de la validación
// envia datos para consultas en db y recibe respuestas

const operaciones = require('./operaciones');
const validacion = require('./validaciones');
const moment = require('moment');

const funciones = {};



funciones.tramasAstro = function(req,res){
   const colab = {body: req.body};
   
   const validado = validacion.colab(colab);
   if(validado.codigo != 0){
      res.json(validado)
   }
   else{
      const dbexecute = operaciones.test(colab.body.colaborador);
      dbexecute.then((datos_VPT)=>{
         let terminal = datos_VPT.terminal;
         let vendedor = datos_VPT.vendedor;
         let pdv = datos_VPT.pdv.toString();

         while(terminal.length < 20){
            terminal = " " + terminal;
         };

         while(vendedor.length < 12){
            vendedor = "0" + vendedor;
         };

         while(pdv.length < 7){
            pdv = "0" + pdv;
         };
         
         let data_respuesta = {
            terminal: terminal,
            vendedor: vendedor,
            pdv: pdv
         };

         sesioncolab = operaciones.sesion(colab.body.colaborador)
         sesioncolab.then((sesion) =>{
            
            function randoms(){
               let datarandoms = {
                  cons_rdm : [],
                  signo_rdm: [],
                  num_ap_rdm: []
               }
               
               numero_random1 = Math.floor(Math.random() * (9999999999)) + 1;
               numero_random1 = numero_random1.toString();
               while (numero_random1.length < 10){
                  numero_random1 = '0' + numero_random1;
               }
               numero_random2 = Math.floor(Math.random() * (9999999999)) + 1;
               numero_random2 = numero_random2.toString();
               while (numero_random2.length < 10){
                  numero_random2 = '0' + numero_random2;
               }
               datarandoms.cons_rdm[0] = numero_random1;
               datarandoms.cons_rdm[1] = numero_random2;

               function nums(){
                  apos_random = Math.floor(Math.random() * (9999)) + 1;
                  apos_random = apos_random.toString();
                  while (apos_random.length<4) {
                     apos_random = "0" + apos_random;
                  }

                  sig_random = Math.floor(Math.random() * (13)) + 1;
                  sig_random = sig_random.toString();
                  while (sig_random.length<3) {
                     sig_random = "0" + sig_random;
                  }

                  return {apos_random:apos_random,sig_random:sig_random}
               }

               for(i = 0; i < 4; i++){
                  dataapuesta = nums();
                  datarandoms.num_ap_rdm[i] = dataapuesta.apos_random;
                  datarandoms.signo_rdm[i] = dataapuesta.sig_random; 
               }
               return datarandoms
            }
            
            const fecha = moment().format('DDMMYYYY')
            
            
            data_respuesta.sesion = sesion.data.sesion;
            tColab = colab.body.colaborador

            
            datarandoms = randoms()
            tramas = {
               autenticacion : tramaAutenticacion = `001${tColab}0000000100000001${fecha}18:00:00.000                  AP11${tColab}        AP11${tColab}`,
               parametros : tramaParametros = `025${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          001`,
               venta : tramaVenta = `003${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          ${data_respuesta.terminal}${data_respuesta.vendedor}${data_respuesta.pdv}11001AST QA${datarandoms.cons_rdm[0]}001002004${datarandoms.num_ap_rdm[0]}${datarandoms.signo_rdm[0]}00000000200000${datarandoms.num_ap_rdm[1]}${datarandoms.signo_rdm[1]}00000000200000${datarandoms.num_ap_rdm[2]}${datarandoms.signo_rdm[2]}00000000200000${datarandoms.num_ap_rdm[3]}${datarandoms.signo_rdm[3]}00000000200000`,
               venta_auto : tramaVAutomatica = `021${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          ${data_respuesta.terminal}${data_respuesta.vendedor}${data_respuesta.pdv}11001AST QA${datarandoms.cons_rdm[1]}00200000000200000`,
               estado_tiq : tramaEstadotiquete = `017${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          AST QA${datarandoms.cons_rdm[0]}${data_respuesta.vendedor}`,
               reverso : tramaReverso = `007${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          AST QA${datarandoms.cons_rdm[0]}${data_respuesta.vendedor}`,
               anulacion : tramaAnulacion = `005${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          AST QA${datarandoms.cons_rdm[1]}${data_respuesta.vendedor}✩✩✩✩✩✩✩✩✩✩`,
               cons_premios : tramaConsultaPremios = `009${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          ✩✩✩✩✩✩✩✩✩✩`,
               pagopremios : tramaPagoPremios = `011${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000                                    TEST                 CEM               ASTRO00102630605611001      CRA 12 G ESTE #28 - 63 S11001003197419906✩✩✩✩✩✩✩✩✩✩${data_respuesta.vendedor}${data_respuesta.terminal}`,
               pagopremiosV2 : tramaPagoPremiosV2 = `030${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000                                    TEST                 CEM               ASTRO19061999010010263060560407201711001      CRA 12 G ESTE #28 - 63 S11001003197419906✩✩✩✩✩✩✩✩✩✩${data_respuesta.vendedor}${data_respuesta.terminal}`,
               pagofiducia : tramaPagoPremiosFiducia = `023${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000                                    TEST                 CEM               ASTRO00102630605611001      CRA 12 G ESTE #28 - 63 S11001003197419906✩✩✩✩✩✩✩✩✩✩${data_respuesta.vendedor}${data_respuesta.terminal}`,
               pagofiduciaV2 : tramaPagoPremiosFiduciaV2 = `031${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000                                    TEST                 CEM               ASTRO19061999010010263060560407201711001      CRA 12 G ESTE #28 - 63 S11001003197419906✩✩✩✩✩✩✩✩✩✩${data_respuesta.vendedor}${data_respuesta.terminal}`,
               result_sort : tramaResultadosorteo = `027${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          16112023`,
            }

            res.json(tramas);
         })
      }
      )
   }
}

funciones.tramasChance = function(req,res){
   const colab = {body: req.body};
   
   const validado = validacion.colab(colab);
   if(validado.codigo != 0){
      res.json(validado)
   }
   else{
      const dbexecute = operaciones.test(colab.body.colaborador);
      dbexecute.then((datos_VPT)=>{
         let terminal = datos_VPT.terminal;
         let vendedor = datos_VPT.vendedor;
         let pdv = datos_VPT.pdv.toString();

         while(terminal.length < 20){
            terminal = " " + terminal;
         };

         while(vendedor.length < 12){
            vendedor = "0" + vendedor;
         };

         while(pdv.length < 7){
            pdv = "0" + pdv;
         };
         
         let data_respuesta = {
            terminal: terminal,
            vendedor: vendedor,
            pdv: pdv
         };

         sesioncolab = operaciones.sesion(colab.body.colaborador)
         sesioncolab.then((sesion) =>{
            
            function randoms(){
               let datarandoms = {
                  cons_rdm : "",
                  num_ap_rdm: []
               }
               
               numero_random = Math.floor(Math.random() * (9999999999)) + 1;
               numero_random = numero_random.toString();
               while (numero_random.length < 10){
                  numero_random = '0' + numero_random;
               }
               
               datarandoms.cons_rdm = numero_random;

               function nums(){
                  apos_random = Math.floor(Math.random() * (9999)) + 1;
                  apos_random = apos_random.toString();
                  while (apos_random.length<4) {
                     apos_random = "0" + apos_random;
                  }

                  return {apos_random:apos_random}
               }

               for(i = 0; i < 5; i++){
                  dataapuesta = nums();
                  datarandoms.num_ap_rdm[i] = dataapuesta.apos_random;
               }
               return datarandoms
            }
            
            const fecha = moment().format('DDMMYYYY')
            
            
            data_respuesta.sesion = sesion.data.sesion;
            tColab = colab.body.colaborador

            
            datarandoms = randoms()
            tramas = {
               autenticacion : tramaAutenticacion = `001${tColab}0000000100000001${fecha}18:00:00.000                  AP11${tColab}        AP11${tColab}`,
               parametros : tramaParametros = `151${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          001`,
               venta : tramaVenta = `153${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          ${data_respuesta.terminal}${data_respuesta.vendedor}${data_respuesta.pdv}CHM QA${datarandoms.cons_rdm}0100000000500000002072087005${datarandoms.num_ap_rdm[0]}${datarandoms.num_ap_rdm[1]}${datarandoms.num_ap_rdm[2]}${datarandoms.num_ap_rdm[3]}${datarandoms.num_ap_rdm[4]}`,
               estado_tiq : tramaEstadotiquete = `155${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          CHM QA${datarandoms.cons_rdm}${data_respuesta.vendedor}`,
               reverso : tramaReverso = `157${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          CHM QA${datarandoms.cons_rdm}${data_respuesta.vendedor}`,
               cons_premios : tramaConsultaPremios = `161${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          ✩✩✩✩✩✩✩✩✩✩`,
               pagopremios : tramaPagoPremios = `163${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000                                    TEST                 CEM               ASTRO00102630605611001      CRA 12 G ESTE #28 - 63 S11001003197419906✩✩✩✩✩✩✩✩✩✩${data_respuesta.vendedor}${data_respuesta.terminal}`,
               pagofiducia : tramaPagoPremiosFiducia = `165${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000                                    TEST                 CEM               ASTRO00102630605611001      CRA 12 G ESTE #28 - 63 S11001003197419906✩✩✩✩✩✩✩✩✩✩${data_respuesta.vendedor}${data_respuesta.terminal}`,
               cant_tqt_est : tramaResultadosorteo = `167${tColab}${data_respuesta.sesion}00000001${fecha}18:00:00.000          10`,
            }

            res.json(tramas);
         })
      }
      )
   }
}


funciones.tramasOnline = function(req,res){
   const colab = {body: req.body};
   
   const validado = validacion.colab(colab);
   if(validado.codigo != 0){
      res.json(validado)
   }
   else{
      const dbexecute = operaciones.test(colab.body.colaborador);
      dbexecute.then((datos_VPT)=>{
         let terminal = datos_VPT.terminal;
         let vendedor = datos_VPT.vendedor;
         let pdv = datos_VPT.pdv.toString();

         while(terminal.length < 20){
            terminal = " " + terminal;
         };

         while(vendedor.length < 12){
            vendedor = "0" + vendedor;
         };

         while(pdv.length < 7){
            pdv = "0" + pdv;
         };
         
         let data_respuesta = {
            terminal: terminal,
            vendedor: vendedor,
            pdv: pdv
         };

         sesioncolab = operaciones.sesion(colab.body.colaborador)
         sesioncolab.then((sesion) =>{
            
            function randoms(){
               let datarandoms = {
                  cons_rdm : []
               }
               
               numero_random1 = Math.floor(Math.random() * (99999999)) + 1;
               numero_random1 = numero_random1.toString();
               while (numero_random1.length < 8){
                  numero_random1 = '0' + numero_random1;
               }
               numero_random2 = Math.floor(Math.random() * (99999999)) + 1;
               numero_random2 = numero_random2.toString();
               while (numero_random2.length < 8){
                  numero_random2 = '0' + numero_random2;
               }
               datarandoms.cons_rdm[0] = numero_random1;
               datarandoms.cons_rdm[1] = numero_random2;

               return datarandoms
            }
            
            const fecha = moment().format('DDMMYYYY')
            
            
            data_respuesta.sesion = sesion.data.sesion;
            tColab = colab.body.colaborador

            
            datarandoms = randoms()
            tramas = {
               autenticacion : tramaAutenticacion = `001${tColab}0000000100000001${fecha}18:00:00.000                  AP11${tColab}        AP11${tColab}`,
               pin_retiro : tramaPinRetiro = `107${tColab}${data_respuesta.sesion}${datarandoms.cons_rdm[0]}${fecha}18:00:00.000          ${data_respuesta.terminal}${data_respuesta.vendedor}${data_respuesta.pdv}110010000000000102630605600000000000000030000`,
               retiro : tramaRetiro = `103${tColab}${data_respuesta.sesion}${datarandoms.cons_rdm[0]}${fecha}18:00:00.000          ${data_respuesta.terminal}${data_respuesta.vendedor}${data_respuesta.pdv}1100100000000001026306056                                            XXXXXX               30000`,
               recaudo : tramaRecaudo = `101${tColab}${data_respuesta.sesion}${datarandoms.cons_rdm[1]}${fecha}18:00:00.000          ${data_respuesta.terminal}${data_respuesta.vendedor}${data_respuesta.pdv}110010000000000102630605600000000000000030000`,
               consulta_cc : tramaConsultacc = `105${tColab}${data_respuesta.sesion}${datarandoms.cons_rdm[0]}${fecha}18:00:00.000          ${data_respuesta.terminal}${data_respuesta.vendedor}${data_respuesta.pdv}00000000001026306056`,
               cons_recaudo : tramaConsultaRec = `111${tColab}${data_respuesta.sesion}${datarandoms.cons_rdm[1]}${fecha}18:00:00.000          00100000000001026306056`,
               cons_retiro : tramaConsultaRet = `111${tColab}${data_respuesta.sesion}${datarandoms.cons_rdm[0]}${fecha}18:00:00.000          00200000000001026306056`,
               biometria : tramaBiometria = `121${tColab}${data_respuesta.sesion}${datarandoms.cons_rdm[1]}${fecha}18:00:00.000          ${data_respuesta.terminal}${data_respuesta.vendedor}${data_respuesta.pdv}1100100000000001026306056`
            }

            res.json(tramas);
         })
      }
      )
   }
}

module.exports = funciones;