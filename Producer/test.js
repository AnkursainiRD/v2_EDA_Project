import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '4m',
};

export default function() {
  http.post('http://localhost:3000/api/v1/create-post',JSON.stringify(
    {
        "title":"Test",
        "content":"Testing purpose"
    }),
    {
        headers:{
            "Content-Type":" application/json"
        }}
);
  sleep(1);
}
