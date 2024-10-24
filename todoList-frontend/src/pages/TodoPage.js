import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userName = sessionStorage.getItem("user");
    if (userName) {
      try {
        const userInfo = JSON.parse(userName);
        setUser(userInfo);
        getTasks();
      } catch (error) {
        console.error("유저 데이터 오류:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log("tasklist", response.data.data);
    setTodoList(response.data.data);
  };
  useEffect(() => {
    getTasks();
  }, []);
  const addTodo = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        getTasks();
      }
      setTodoValue("");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isComplete,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const gotoLogin = () => {
    navigate("/login");
  };
  const gotoRegister = () => {
    navigate("/register");
  };

  const gotoLogout = () => {
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
    window.location.reload();
  };

  return (
    <Container>
      <div className="todoNav">
        {user ? (
          <>
            <div>{`${user.name}님`}</div>
            <div onClick={gotoLogout}>Logout</div>
          </>
        ) : (
          <>
            <div onClick={gotoLogin}>Login</div>
            <div onClick={gotoRegister}>register</div>
          </>
        )}
      </div>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            onChange={(event) => setTodoValue(event.target.value)}
            className="input-box"
            value={todoValue}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button onClick={addTodo} className="button-add">
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        deleteItem={deleteItem}
        toggleComplete={toggleComplete}
      />
    </Container>
  );
};

export default TodoPage;
