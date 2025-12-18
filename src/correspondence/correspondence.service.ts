import { Injectable } from '@nestjs/common'; // Permet l'injection du service.

// Représentation d'un message de correspondance.
export interface CorrespondenceMessage {
  id: number; // Identifiant du message.
  studentId: number; // Élève concerné.
  fromRole: 'parent' | 'teacher' | 'admin'; // Rôle de l'émetteur.
  message: string; // Contenu textuel.
  attachmentUrl?: string; // Pièce jointe éventuelle.
  createdAt: string; // Horodatage ISO.
}

@Injectable() // Marque la classe pour l'injection Nest.
export class CorrespondenceService {
  // Stockage en mémoire pour la démo.
  private messages: CorrespondenceMessage[] = [
    {
      id: 1, // Id initial.
      studentId: 1, // Élève #1.
      fromRole: 'parent', // Émetteur parent.
      message: 'Absence prevue le 10/01 pour rendez-vous medical.', // Texte du message.
      createdAt: new Date().toISOString(), // Date de création.
    },
  ];

  byStudent(studentId: number): CorrespondenceMessage[] {
    return this.messages.filter((msg) => msg.studentId === studentId); // Filtre par id élève.
  }

  add(payload: Omit<CorrespondenceMessage, 'id' | 'createdAt'>) {
    const nextId = Math.max(...this.messages.map((m) => m.id)) + 1; // Calcule le prochain id.
    const created: CorrespondenceMessage = { id: nextId, createdAt: new Date().toISOString(), ...payload }; // Compose le message.
    this.messages.push(created); // Ajoute en mémoire.
    return created; // Retourne le message créé.
  }
}
