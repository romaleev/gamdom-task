import app from '#server/app'
import { port } from '#server/common/env'

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
