const transformPaymentData = (data: any) => {
    return data.map((item: any, index: number) => ({
        id: index + 1,
        trans_id: item?.transaction_id,
        amount: item?.amount,
        user_id: item._id,
        name: `${item?.user.first_name} ${item.user.last_name}`,
        start_date: new Date(item.created_at).toLocaleDateString('en-GB'),
        phone_no: item.user.phone,
        email: item?.user.email,
        image: item.user?.profile?.image_url,
    }));
};


export default transformPaymentData