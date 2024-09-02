import { app } from "./app.js";
import { connectorDB } from "./db/database.js";


app.set('port', process.env.PORT || 4000);

connectorDB()

app.listen(app.get('port'), () => {
    console.log(`SERVIDOR ANDANDO EN EL PUERTO  ${app.get('port')}`);
})