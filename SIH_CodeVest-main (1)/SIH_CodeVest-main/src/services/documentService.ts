import { mockDatabase } from './mockDatabase';
import { BusinessDocument } from '../types';

class DocumentService {
  public getDocuments(businessId?: string): BusinessDocument[] {
    return mockDatabase.getDocuments(businessId);
  }

  public addDocument(businessId: string, doc: Partial<BusinessDocument>): BusinessDocument {
    const newDoc: BusinessDocument = {
      id: `doc-${Date.now()}`,
      name: doc.name || 'Uploaded Financial Document.pdf',
      category: doc.category || 'Supporting Documents',
      fileSize: doc.fileSize || '1.8 MB',
      uploadedDate: 'Just now',
      status: 'Pending',
      verifiedBy: 'Verification Queue Diligence'
    };
    mockDatabase.addDocument(businessId, newDoc);
    return newDoc;
  }
}

export const documentService = new DocumentService();
