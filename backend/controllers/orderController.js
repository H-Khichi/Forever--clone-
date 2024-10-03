import orderModel from '../models/orderModel.js'
import userModel from '../models/usersModel.js'
// placing order cod method
const placeOrder = async(req,res)=>{
try {
    const {userId,items,amount,address}=req.body;
    const orderData={
        userId,
        items,
        address,
        amount,
        paymentMethod:"COD",
        payment:false,
        date:Date.now()
    }
    const newOrder =new orderModel(orderData)
    newOrder.save();

    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    res.json({success:true,message:'Order Placed'})

    
} catch (error) {
    res.json({success:false,message:error.message})

}
}

// // placing order Stripe method
// const placeOrderStripe = async(req,res)=>{
    
// }

// // placing order Razorpay method
// const placeOrderRazorpay = async(req,res)=>{
    
// }


//all orders for admin panle
const allOrders= async(req,res)=>{
    try {
        const order =await orderModel.find({})
        res.json({success:true,order})
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
// user order data for front end
const userOrders = async(req,res)=>{
    try {
        const {userId}=req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// update Order Status
const updateOrderStatus=async(req,res)=>{
try {
    const {orderId,status}= req.body
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({success:true,message:'status Updated'})
    
} catch (error) {
    res.json({success:false,message:error.message})
}
}
export {placeOrder,allOrders,userOrders,updateOrderStatus}