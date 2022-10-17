import request from "supertest";
import app from "../index"

describe("USER ",()=>{

    it("GET /todos ---> array todos",()=>{
        return request(app).get("/api/getallusers").expect("Content-Type",/json/).expect(200).then(res=>{
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        $id:expect.any(String)
                    })
                ])
            )
        })
    })

})