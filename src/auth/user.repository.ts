import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { InternalServerErrorException, ConflictException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        console.log('PAssed here');
        
        const { username, password } = authCredentialsDto;
        console.log('Cali-->', authCredentialsDto);
        
        
        // const salt = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt(); //salt;
        user.password = await this.hashPassword(password, user.salt); //this.hashPassword(password, salt);
        console.log(user.password);
        
        try {
            await user.save();
        } catch (error) {
            if(error.code === '23505') { //duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException
            }
            
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({username});

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}

