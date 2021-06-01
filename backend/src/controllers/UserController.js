import User from '../models/User';

export const checkUserExists = async (req,res) => {
    try {
        const isUserExisted = await User.findOne({ email: req.body.email });
        if(isUserExisted) {
            res.status(400).send({
                error: {
                    status: true,
                    message: "User is already existed"
                },
                data: null
            });
        }

        res.send({
            error: {
                status: false,
                message: ''
            },
            data: {
                message: "Registration is Ok"
            }
        });
    } catch(e) {
        res.status(500).send({
          error: {
            status: true,
            message: e.message,
          },
          data: null,
        });
    }
}

export const Register = async (req,res) => {
    try {
        const user = new User(req.body);
        await user.save();

         res.send({
            error: {
                status: false,
                message: '',
            },
            data: {
                message: 'User is registered',
            },
        });
    } catch(e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message
            },
            data : null
        });
    }
}

export const userLogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email,password);
        const token = await user.generateAuthToken();
        res.send({
          error: {
            status: false,
            message: '',
          },
          data: {
              message: "Login success",
              data: {
                  user,token
              }
          }
        });
    } catch(e) {
        res.status(500).send({
          error: {
            status: true,
            message: e.message,
          },
          data: null,
        });
    }
}

export const userLogout = async (req,res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });

      await req.user.save();
       res.send({
         error: {
           status: false,
           message: '',
         },
         data: {
           message: 'Successfully Logout',
           data: [],
         },
       });
    } catch (e) {
       res.status(500).send({
         error: {
           status: true,
           message: e.message,
         },
         data: null,
       });
    }
}

export const refreshToken = async (req,res) => {
    try {
        const user = req.user;
        const token = await user.generateAuthToken();
        res.send({
            error: {
                status: false,
                message: ''
            },
            data: {
                user,
                refresh_token : token
            }
        })
    } catch(e) {
        res.status(500).send({
            error: {
                status: true,
                message: e.message
            },
            data : null
        })
    }
}