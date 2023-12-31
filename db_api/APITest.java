import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.containsString;

public class APITest {

    @Test
    public void testCreateEmployee() {
        RestAssured.baseURI = "http://localhost:8000/api/v1";
        given()
                .contentType(ContentType.JSON)
                .body("{\"name\": \"John\", \"email\": \"john@example.com\", \"phone_number\": \"1234567890\", \"department\": \"IT\", \"salary\": 50000}")
        .when()
                .post("/employee")
        .then()
                .statusCode(201);
    }

    @Test
    public void testGetEmployee() {
        RestAssured.baseURI = "http://localhost:8000/api/v1";
        given()
        .when()
                .get("/employee")
        .then()
                .statusCode(200)
                .body("data.name", containsString("John"))
                .body("data.email", containsString("john@example.com"))
                .body("data.phone_number", containsString("1234567890"))
                .body("data.department", containsString("IT"))
                .body("data.salary", containsString("50000"));
    }

    @Test
    public void testGetEmployeeById() {
        RestAssured.baseURI = "http://localhost:8000/api/v1";
        given()
                .pathParam("employeeId", 1)
        .when()
                .get("/employee/{employeeId}")
        .then()
                .statusCode(200)
                .body("data.name", containsString("John"))
                .body("data.email", containsString("john@example.com"))
                .body("data.phone_number", containsString("1234567890"))
                .body("data.department", containsString("IT"))
                .body("data.salary", containsString("50000"));
    }

    @Test
    public void testUpdateEmployee() {
        RestAssured.baseURI = "http://localhost:8000/api/v1";
        given()
                .contentType(ContentType.JSON)
                .body("{\"name\": \"John Doe\", \"email\": \"johndoe@example.com\", \"phone_number\": \"1234567890\", \"department\": \"IT\", \"salary\": 60000}")
                .pathParam("employeeId", 1)
        .when()
                .put("/employee/{employeeId}")
        .then()
                .statusCode(200)
                .body("data.name", containsString("John Doe"))
                .body("data.email", containsString("johndoe@example.com"))
                .body("data.phone_number", containsString("1234567890"))
                .body("data.department", containsString("IT"))
                .body("data.salary", containsString("60000"));
    }

    @Test
    public void testDeleteEmployee() {
        RestAssured.baseURI = "http://localhost:8000/api/v1";
        given()
                .pathParam("employeeId", 1)
        .when()
                .delete("/employee/{employeeId}")
        .then()
                .statusCode(204);
    }

    @Test
    public void testCreateTask() {
        RestAssured.baseURI = "http://localhost:8000/api/v1";
        given()
                .contentType(ContentType.JSON)
                .body("{\"title\": \"Task 1\", \"description\": \"Description of Task 1\", \"due_date\": \"2022-12-31\", \"status\": \"Pending\"}")
        .when()
                .post("/task")
        .then()
                .statusCode(201);
    }

    @Test
    public void testGetTask() {
        RestAssured.baseURI = "http://localhost:8000/api/v1";
        given()
        .when()
                .get("/task")
        .then()
                .statusCode(200)
                .body("data.title", containsString("Task 1"))
                .body("data.description", containsString("Description of Task 1"))
                .body("data.due_date", containsString("2022-12-31"))
                .body("data.status", containsString("Pending"));
    }

    @Test
    public void testGetTaskById() {
        RestAssured.baseURI = "http://localhost:8000/api/v1";
        given()
                .pathParam("taskId", 1)
        .when()
                .get("/task/{taskId}")
        .then()
                .statusCode(200)
                .body("data.title", containsString("Task 1"))
                .body("data.description", containsString("Description of Task 1"))
                .body("data.due_date", containsString("2022-12-31"))
                .body("data.status", containsString("Pending"));
    }
}