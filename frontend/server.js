const express_app = require("../backend/src/server")




if (process.env.BUILD_NEXT) {
    setTimeout(() => {
        const { exec} = require('child_process')
        const chmodr = require("chmodr");
        console.log("nextJS build")
        const cmd="NODE_ENV=production NEXT_SERVER=true env-cmd -f ../.env yarn build"

        exec(cmd, (err, stdout, stderr) => {
            if (err) {
              console.log("err",err)
              process.exit(1)
            }
          
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            console.log("nextJS build complete")

            chmodr(__dirname+"/.next/", 0o777, err => {
                if (err) {
                    console.log("chmod err",err)
                };
                console.log("nextJS chmod complete")
                process.exit(0)
            });

          });

    }, 10000);
}
else {

    const port = process.env.SERVER_PORT || 8000

    const hostname = process.env.SERVER_HOST || "localhost"

    const next = require('next')
    const dev = process.env.NODE_ENV !== 'production'
    const app = next({ dev,hostname, port  })
    const handle = app.getRequestHandler()
    const { parse } = require('url')



    console.log("next_server process.env.SERVER_PORT", port)

    process.chdir(__dirname);

    app.prepare()
        .then(() => {
            express_app.get('*', (req, res) => {
                return handle(req, res,parse(req.url, true))
            })
            express_app.listen(port, (err) => {
                if (err) throw err
                console.log(`running next ========>  http://127.0.0.1:${port}`)
            })
        })
        .catch((ex) => {
            console.error("ex", ex.stack)
            process.exit(1)
        })
}