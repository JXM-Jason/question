let id: number = parseInt(localStorage.getItem("idMAX") || "0") || 0;
function createID() {
  id++;
  window.localStorage.setItem("idMAX", id.toString());
  return id;
}
export default createID;
