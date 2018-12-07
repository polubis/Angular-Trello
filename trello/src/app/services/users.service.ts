


import { Injectable } from "@angular/core";
import { RequestService } from "src/app/services/request.service";

@Injectable()
export class UsersService {
    constructor(private requestService: RequestService){

    }

    getUsers(projectId: number){
        return this.requestService.executeRequest("getUsersFromProject", "get", {}, "", projectId.toString(), {});
    }

    getUsersByQuery(query: string){
        return this.requestService.executeRequest("getUsersByQuery", "get", {}, "", query, {});
    }

    editProfile(formData: any) {
      return this.requestService.executeRequest('editProfile', 'post', formData, 'Your user data has been succesfully edited', '', {});
    }
}
