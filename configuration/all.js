console.log(process.env);

export default {
    gateway_key: process.env['API_GATEWAY'],
    lamba_url: process.env['LAMBA_URL'],
};