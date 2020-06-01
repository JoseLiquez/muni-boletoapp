import dbConnect from '../../../utils/dbConnect';
import Boleto from '../../../models/Boleto';
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
  })
 
dbConnect();


function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

export default async (req, res) => {
    const { method } = req;

    await runMiddleware(req, res, cors)

    switch(method){
        case 'GET':
            try {
                const boletos = await Boleto.find({});

                res.status(200).json({success: true, data: boletos});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'POST':
            try {
                const boleto = await Boleto.create(req.body);

                res.status(201).json({success: true, data: boleto});
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success: false});
        break;
    }
}
