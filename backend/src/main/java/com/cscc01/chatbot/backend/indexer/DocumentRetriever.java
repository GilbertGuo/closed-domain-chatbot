package com.cscc01.chatbot.backend.indexer;

import com.snowtide.PDF;
import com.snowtide.pdf.lucene.LucenePDFConfiguration;
import com.snowtide.pdf.lucene.LucenePDFDocumentFactory;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.tika.exception.TikaException;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.pdf.PDFParser;
import org.apache.tika.sax.BodyContentHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.xml.sax.SAXException;


import javax.print.Doc;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;


@Component
public class DocumentRetriever {
    private final static Logger LOGGER = LoggerFactory.getLogger(DocumentRetriever.class);

    public Document getDocument(File file) throws IOException {

        Document document = new Document();

        document.add(new TextField(LuceneFieldConstants.CONTENT.getText(), new FileReader(file)));
        document.add(new StringField(LuceneFieldConstants.FILE_NAME.getText(),
                file.getName(), Field.Store.YES));
        document.add(new StringField(LuceneFieldConstants.FILE_PATH.getText(),
                file.getCanonicalPath(), Field.Store.YES));

        LOGGER.info("Successfully converted pdf " + file.getName());
        return document;
    }

    public Document getPdfDocument(File file) throws IOException, TikaException, SAXException {
        Document document = new Document();
        BodyContentHandler bodyContentHandler = new BodyContentHandler();
        Metadata metadata = new Metadata();
        FileInputStream fileInputStream = new FileInputStream(file);
        ParseContext pdfContext = new ParseContext();

        PDFParser pdfparser = new PDFParser();
        pdfparser.parse(fileInputStream, bodyContentHandler, metadata, pdfContext);


        document.add(new TextField(LuceneFieldConstants.CONTENT.getText(),
                bodyContentHandler.toString(), Field.Store.YES));
        document.add(new StringField(LuceneFieldConstants.FILE_NAME.getText(),
                file.getName(), Field.Store.YES));
        document.add(new StringField(LuceneFieldConstants.FILE_PATH.getText(),
                file.getCanonicalPath(), Field.Store.YES));

        LOGGER.info("Successfully converted pdf " + file.getName());
        return document;
    }

    public Document getDocDocument(File file) throws IOException, TikaException, SAXException {
        Document document = new Document();
        BodyContentHandler bodyContentHandler = new BodyContentHandler();
        Metadata metadata = new Metadata();
        FileInputStream fileInputStream = new FileInputStream(file);


        AutoDetectParser autoDetectParser = new AutoDetectParser();
        autoDetectParser.parse(fileInputStream, bodyContentHandler, metadata);

        document.add(new TextField(LuceneFieldConstants.CONTENT.getText(),
                bodyContentHandler.toString(), Field.Store.YES));
        document.add(new StringField(LuceneFieldConstants.FILE_NAME.getText(),
                file.getName(), Field.Store.YES));
        document.add(new StringField(LuceneFieldConstants.FILE_PATH.getText(),
                file.getCanonicalPath(), Field.Store.YES));

        LOGGER.info("Successfully converted doc/docx " + file.getName());
        return document;
    }

}