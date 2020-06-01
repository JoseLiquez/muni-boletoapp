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
    const {
        query: { id, numBoleto },
        method
    } = req;

    await runMiddleware(req, res, cors)


    switch(method){
        case 'GET':
            try {
                const boleto = await Boleto.find({numBoleto: numBoleto});

                res.status(200).json({success: true, data: boleto})
            } catch (error) {
                res.status(400).json({success: false,  data: error});
            }
            break;
        case 'PUT':
            try {
                const boleto = await Boleto.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                
                if (!boleto){
                    return res.status(400).json({success: false});
                }

                res.status(200).json({success: true, data: boleto})
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;
        case 'DELETE':
            try {
                const deletedBoleto = await Boleto.deleteOne({_id: id});

                if(!deletedBoleto) {
                    return res.status(400).json({success: false})
                }

                res.status(200).json({success: true, data: {} })
            } catch (error) {
                return res.status(400).json({success: false})
            }
            break;
        default:
            res.status(400).json({success: false})
        break;
    }
}