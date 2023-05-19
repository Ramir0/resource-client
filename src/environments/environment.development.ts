export const environment = {
    production: false,
    authorize_uri: 'http://localhost:8088/oauth2/authorize?',
    grant_type: 'authorization_code',
    client_id: 'client',
    redirect_uri: 'http://localhost:4200/authorized',
    scope: 'openid',
    response_type: 'code',
    response_mode: 'form_post',
    code_challenge_method: 'S256',
    code_challenge: 'zdlJiwqCw_qzE1QA7ja9SVZ47OLb7suNiYJa1s33lpA',
    code_verifier: 'Vq6MqZ5Bklg3MFkhr6LHgO4sg1jrS2o0wEbJXH3mz4N',
    token_url: 'http://localhost:8088/oauth2/token',
    logout_url: 'http://localhost:8088/logout'
};
