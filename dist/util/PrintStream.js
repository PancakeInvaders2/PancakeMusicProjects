export class PrintStream {
    fileName;
    printedChunks = 0;
    storage;
    constructor(fileName) {
        this.fileName = fileName;
        this.storage = [];
    }
    printToMemoryStorage(lines) {
        let data = lines.join();
        // Store content in localStorage
        //localStorage.setItem(this.fileName + "_chunk_" + this.printedChunks, data);
        this.storage.push(data);
        this.printedChunks++;
    }
    println(line) {
        // TODO chunk the data instead of writing every line right when it's received
        this.printToMemoryStorage([line + '\n']);
    }
    closeAndDownload() {
        //const chunks: string[] = [];
        //for (let i = 0; i < this.printedChunks; i++) {
        //    let data = localStorage.getItem(this.fileName + "_chunk_" + i);
        //    if (data !== null) {
        //        chunks.push(data);
        //    }
        //}
        // All chunks retrieved, create a Blob and download
        const blob = new Blob(this.storage, { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = this.fileName;
        // Append the link to the document body
        document.body.appendChild(link);
        // Programmatically trigger a click event after a short delay
        setTimeout(() => {
            link.click();
            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            // Clear localStorage after download
            this.clearLocalStorage();
        }, 0);
    }
    clearLocalStorage() {
        for (let i = 0; i < this.printedChunks; i++) {
            localStorage.removeItem(this.fileName + "_chunk_" + i);
        }
    }
}
