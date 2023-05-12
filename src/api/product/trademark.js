import request from "@/utils/request"

//获取列表
export const reqTrademark = (page,limit)=>{
    return request({
        url:`/admin/product/baseTrademark/${page}/${limit}`,
        method:'get'
    })
}

//添加或修改品牌
export const addOrUpdataTrad = (trademark)=>{
    if(trademark.id){
        return request({
            url:`/admin/product/baseTrademark/update`,
            method:"put",
            data:trademark
        })
    }else{
        return request({
            url:`/admin/product/baseTrademark/save`,
            method:"post",
            data:trademark
        })
    }
}