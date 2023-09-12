import { BlobServiceClient } from "@azure/storage-blob";
import { uuid } from 'uuidv4';

export class AzureBlobManager {

    private blobServiceClient: BlobServiceClient;

    constructor(connectionString: string) {
        this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    }

    public async uploadToAzure(documentation: any) {
        const containerClient = this.blobServiceClient.getContainerClient("documentation");
        const blobName = `${new Date().getTime()}.txt`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(JSON.stringify(documentation), JSON.stringify(documentation).length);
    }
}