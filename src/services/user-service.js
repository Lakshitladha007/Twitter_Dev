import { UserRepository} from "../repository/index.js";

class UserService{
      constructor(){
        this.userRepository= new UserRepository();
      }

      async signup(data){
        try {
            const user= await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in user-service");
        }
      }
}

export default UserService;