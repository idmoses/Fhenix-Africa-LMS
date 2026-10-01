/* ===========================================================
   Fhenix Africa — Authentication
   =========================================================== */
const FxAuth = {
  currentTrainee() {
    const session = fxGet(FX_KEYS.SESSION, null);
    if (!session) return null;
    return FxData.trainee(session.traineeId) || null;
  },
  isAdmin() {
    return !!fxGet(FX_KEYS.ADMIN_SESSION, null);
  },
  registerTrainee(payload) {
    const trainees = FxData.trainees();
    if (trainees.some(t => t.email.toLowerCase() === payload.email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists.' };
    }
    const traineeId = FxData.nextTraineeId();
    const track = FxData.track(payload.track);
    const lessonCount = FxData.lessonsForTrack(payload.track).length || 1;
    const record = {
      traineeId,
      firstName: payload.firstName, lastName: payload.lastName, email: payload.email,
      phone: payload.phone, gender: payload.gender, dob: payload.dob, address: payload.address,
      profilePicture: '',
      guardian: {
        name: payload.guardianName, phone: payload.guardianPhone, email: payload.guardianEmail,
        address: payload.guardianAddress, relationship: payload.guardianRelationship
      },
      track: payload.track, level: payload.level, startDate: payload.startDate,
      endDate: payload.startDate, password: payload.password,
      payment: {
        totalFee: track ? track.fee : 0, amountPaid: 0, balance: track ? track.fee : 0,
        status: 'Payment Due', nextPayment: track ? track.fee : 0, nextPaymentDate: payload.startDate
      },
      progress: { completedLessons: 0, totalLessons: lessonCount, percentage: 0, completedLessonIds: [] },
      certificate: { available: false, file: '', certificateId: '' },
      status: 'Active', createdAt: new Date().toISOString().slice(0, 10)
    };
    trainees.push(record);
    FxData.saveTrainees(trainees);
    return { ok: true, traineeId };
  },
  loginTrainee(email, password) {
    const trainee = FxData.trainees().find(t => t.email.toLowerCase() === email.toLowerCase());
    if (!trainee) return { ok: false, error: 'No account found with that email.' };
    if (trainee.password !== password) return { ok: false, error: 'Incorrect password.' };
    fxSet(FX_KEYS.SESSION, { traineeId: trainee.traineeId });
    return { ok: true };
  },
  logoutTrainee() {
    localStorage.removeItem(FX_KEYS.SESSION);
    window.location.href = '../login.html';
  },
  loginAdmin(username, password) {
    if (username.trim().toLowerCase() !== FX_ADMIN.username.toLowerCase() || password !== FX_ADMIN.password) {
      return { ok: false, error: 'Invalid admin credentials.' };
    }
    fxSet(FX_KEYS.ADMIN_SESSION, { username });
    return { ok: true };
  },
  logoutAdmin() {
    localStorage.removeItem(FX_KEYS.ADMIN_SESSION);
    window.location.href = '../admin-login.html';
  },
  guardTrainee() {
    if (!this.currentTrainee()) window.location.href = '../login.html';
  },
  guardAdmin() {
    if (!this.isAdmin()) window.location.href = '../admin-login.html';
  }
};
