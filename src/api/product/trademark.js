import request from "@/utils/request"

//获取列表
export const reqTrademark = (page,limit)=>{
    return request({
        url:`/admin/product/baseTrademark/${page}/${limit}`,
        method:'get'
    })
}