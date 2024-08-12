const transformTableData = (data: any) => {
    return data.map((item: any, index: number) => ({
        id: index + 1,
        user_id: item._id,
        name: `${item.first_name} ${item.last_name}`,
        join_date: new Date(item.created_at).toLocaleDateString('en-GB'),
        phone_no: item.phone,
        email: item.email,
        profile: item?.profile?.image_url,
        status: item?.status
    }));
};


export default transformTableData