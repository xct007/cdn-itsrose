# Node-JS file uploader
Pretty similar to *itsrose.life*

## Setup
Clone the repository
```bash
git clone https://github.com/xct007/cdn-itsrose
```
Install dependencies
```bash
npm install
```
Rename `.env.example` to `.env` or create a new file called `.env` and add the following variables
```env
DEBUG=false
PORT=3000
DOMAIN=yourdomain.com
DELETE_AFTER_DOWNLOAD=false
CLEANUP_FILES=true
```
- `DEBUG` - Enable debug mode (more verbose logging) - default is false
- `PORT` - Port to run the server on - default is 3000
- `DOMAIN` - Domain to use for the server - default is localhost:3000
- `DELETE_AFTER_DOWNLOAD` - Delete the file after it has been downloaded once - default is false
- `CLEANUP_FILES` - Delete files that have been uploaded more than 24 hours ago - default is true

Run the server
```bash
npm start
```
___
## Usage
Upload a file
```bash
curl -X 'POST' \
  'http://domain.com/uploader/file' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@image.jpg;type=image/jpeg'
```
Response - 200 - OK
```json
{
    "status": true,
    "code": 200,
    "result": {
        "url": "http://domain.com/file/DIegfhdkfa.file",
        "expire_in": 86400,
        "expire_in_h": "24 hours",
        "size": 124,
        "size_h": "123 B",
    },
}
```
Response - 4/5xx - Error
```json
{
    "status": false,
    "code": 500,
    "message": "error.message",
}
```