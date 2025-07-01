import User from './User.model';
import Token from './Token.model';

User.hasMany(Token, {
  foreignKey: 'userId',     
  sourceKey: 'uuid',        
  as: 'tokens'
});

Token.belongsTo(User, {
  foreignKey: 'userId',    
  targetKey: 'uuid',        
  as: 'user'
});

export { User, Token };

const models = {
  User,
  Token
};

export default models;