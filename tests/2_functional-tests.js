const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
//Create an issue with every field: POST request to /api/issues/{project}
//Create an issue with only required fields: POST request to /api/issues/{project}
//Create an issue with missing required fields: POST request to /api/issues/{project}
//View issues on a project: GET request to /api/issues/{project}
//View issues on a project with one filter: GET request to /api/issues/{project}
//View issues on a project with multiple filters: GET request to /api/issues/{project}
//Update one field on an issue: PUT request to /api/issues/{project}
//Update multiple fields on an issue: PUT request to /api/issues/{project}
//Update an issue with missing _id: PUT request to /api/issues/{project}
//Update an issue with no fields to update: PUT request to /api/issues/{project}
//Update an issue with an invalid _id: PUT request to /api/issues/{project}
//Delete an issue: DELETE request to /api/issues/{project}
//Delete an issue with an invalid _id: DELETE request to /api/issues/{project}
//Delete an issue with missing _id: DELETE request to /api/issues/{project}

suite('Functional Tests', function() {
  suite("Routing Tests", function(){
    suite("3 Post request Tests", function(){
      test("Create an issue with every field: POST request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .post("/api/issues/project")
          .set("content-type","application/json")
          .send({
            issue_title: "Issue",
            issue_text: "Functional Test",
            created_by: "fcc",
            assigned_to: "Indu",
            status_text: "Done"
          })
          .end(function(err,res){
            assert.equal(res.status,200);
            assert.equal(res.body.issue_title, "Issue");
            assert.equal(res.body.issue_text, "Functional Test");
            assert.equal(res.body.created_by, "fcc");
            assert.equal(res.body.assigned_to, "Indu",);
            assert.equal(res.body.status_text, "Done");
            done();
          });
      });
      test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .post("/api/issues/project")
          .set("content-type","application/json")
          .send({
            issue_title: "Issue",
            issue_text: "Functional Test",
            created_by: "fcc",
            assigned_to: "",
            status_text: ""
          })
          .end(function(err,res){
            assert.equal(res.status,200);
            assert.equal(res.body.issue_title, "Issue");
            assert.equal(res.body.issue_text, "Functional Test");
            assert.equal(res.body. created_by, "fcc");
            assert.equal(res.body.assigned_to, "",);
            assert.equal(res.body.status_text, "");
            done();
          });
      });
      test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .post("/api/issues/project")
          .set("content-type","application/json")
          .send({
            issue_title: "",
            issue_text: "",
            created_by: "fcc",
            assigned_to: "",
            status_text: ""
          })
          .end(function(err,res){
            assert.equal(res.status,200);
            assert.equal(res.body.error, "required field(s) missing");
            done();
          });
      });
    });


suite("3 GET request Tests", function(){
 test("View issues on a project: GET request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .get("/api/issues/apitest")
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.equal(res.body.length,3);
          done();
          });   
      });
test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .get("/api/issues/apitest")
          .query({
            _id: "6146c3a9dd6f3405d8e13095"
          })
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.deepEqual(res.body[0],{
            _id: "6146c3a9dd6f3405d8e13095",
            issue_title: "karthi",
            issue_text: "love you",
            created_on:"2021-09-19T04:59:21.253Z",
            updated_on:"2021-09-19T04:59:21.253Z",
            created_by:"indu",
            assigned_to:"",
            open:true,
            status_text:""
          });
          done();
          });   
      });
test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .get("/api/issues/apitest")
          .query({
            issue_title: "karthi",
            issue_text: "love you"
          })
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.deepEqual(res.body[0],{
            _id: "6146c3a9dd6f3405d8e13095",
            issue_title: "karthi",
            issue_text: "love you",
            created_on:"2021-09-19T04:59:21.253Z",
            updated_on:"2021-09-19T04:59:21.253Z",
            created_by:"indu",
            assigned_to:"",
            open:true,
            status_text:""
          });
          done();
          });   
      });
})

suite("5 PUT request Tests",function(){
  test("Update one field on an issue: PUT request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "6146d7566f24e20845cde925",
            issue_title: "different"
          })
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.equal(res.body.result, "successfully updated");
          assert.equal(res.body._id, "6146d7566f24e20845cde925");
          done();
          });   
      });
test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "6146d7566f24e20845cde925",
            issue_title: "temperature",
            issue_text: "high"
          })
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.equal(res.body.result, "successfully updated");
          assert.equal(res.body._id, "6146d7566f24e20845cde925");
          done();
          });   
      });
test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            issue_title: "temper",
            issue_text: "low"
          })
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.equal(res.body.error, "missing _id");
          done();
          });   
      });
test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "6146d7566f24e20845cde925"
          })
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.equal(res.body.error, "no update field(s) sent");
          done();
          });   
      });
test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .put("/api/issues/apitest")
          .send({
            _id: "6146b07815956500eeec7000",
            issue_title: "inform",
            issue_text: "typing"
          })
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.equal(res.body.error, "could not update");
          done();
          });   
      });
});

suite("3 DELETE request Tests", function(){
  test("Delete an issue: DELETE request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .delete("/api/issues/apitest")
          .send({
            _id: "6146dad7ad1e9a09a0cbd951"
          })
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.equal(res.body.result, "successfully deleted");
          done();
          });   
      });
  test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .delete("/api/issues/apitest")
          .send({
            _id: "6146b1d5c6493401441280a600"
          })
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.equal(res.body.error, "could not delete");
          done();
          });   
      });
  test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done){
        chai
          .request(server)
          .delete("/api/issues/apitest")
          .send({})
          .end(function(err,res){
          assert.equal(res.status,200);
          assert.equal(res.body.error, "missing _id");
          done();
          });   
      });
})

  })
});
