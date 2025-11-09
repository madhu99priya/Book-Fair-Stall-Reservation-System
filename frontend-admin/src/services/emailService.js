import apiClient from './apiClient.js';

const emailService = {
  async sendReservationConfirmation(reservationId) {
    const { data } = await apiClient.post(`/reservations/${reservationId}/email-confirmation`);
    return data;
  }
};

export default emailService;