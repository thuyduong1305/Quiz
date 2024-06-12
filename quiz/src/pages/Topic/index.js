import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";

function Topic() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListTopic();
      setData(result);
    }
    fetchApi();
  }, []);

  return (
    <>
      <h2>Danh sách chủ đề</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên chủ đề</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <Link to={`/quiz/${item.id}`}>Làm bài</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Topic;