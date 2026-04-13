import api from './api';

export interface HealthInsuranceOperator {
  id: string;
  name: string;
  logo?: string;
}

export interface HealthInsurancePlan {
  id: string;
  name: string;
  operator?: HealthInsuranceOperator;
  coverage?: string;
}

const healthInsuranceService = {
  async getOperators(): Promise<HealthInsuranceOperator[]> {
    const response = await api.get<HealthInsuranceOperator[]>('/health-insurance/operator/list');
    return response.data;
  },

  async getPlans(): Promise<HealthInsurancePlan[]> {
    const response = await api.get<HealthInsurancePlan[]>('/health-insurance/plan/list');
    return response.data;
  },

  async getPlanPrices(planId: string) {
    const response = await api.get(`/health-insurance/plan/${planId}/prices`);
    return response.data;
  },
};

export default healthInsuranceService;
