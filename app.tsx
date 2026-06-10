import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type ServiceType = 'INSURANCE' | 'INVESTMENT';
type SubCategory = 'LIFE' | 'HEALTH' | 'VEHICLE' | 'SIP' | 'ELSS' | 'PPF';

export default function ShreeNayraApp() {
  const [activeTab, setActiveTab] = useState<ServiceType>('INSURANCE');
  const [selectedSub, setSelectedSub] = useState<SubCategory>('LIFE');
  const [amount, setAmount] = useState('5000');
  const [tenure, setTenure] = useState('15');

  const calculateSuggestion = () => {
    const amt = parseFloat(amount) || 0;
    const yrs = parseFloat(tenure) || 0;
    
    if (selectedSub === 'SIP') {
      const projected = Math.round(amt * ((Math.pow(1 + 0.12 / 12, yrs * 12) - 1) / (0.12 / 12)) * (1 + 0.12 / 12));
      return { label: 'Projected Wealth (12% Return)', value: `₹${projected.toLocaleString('en-IN')}`, tip: 'SIP builds long-term wealth via compounding.' };
    }
    if (selectedSub === 'ELSS') {
      return { label: 'Tax Saved u/s 80C', value: `₹${Math.min(amt * 0.3, 46800).toLocaleString('en-IN')}`, tip: 'ELSS has the lowest lock-in period (3 years) among 80C.' };
    }
    if (selectedSub === 'PPF') {
      return { label: 'Guaranteed Maturity (7.1%)', value: `₹${Math.round(amt * yrs * 1.5).toLocaleString('en-IN')}`, tip: 'Safe, government-backed, completely tax-free returns.' };
    }
    if (selectedSub === 'LIFE') {
      return { label: 'Recommended Term Cover', value: `₹${(amt * 12 * 20).toLocaleString('en-IN')}`, tip: 'Ideal life cover should be 20x of your annual income.' };
    }
    return { label: 'Estimated Premium / Year', value: `₹${(amt * 0.05).toLocaleString('en-IN')}`, tip: 'Based on premium pool data.' };
  };

  const dynamicData = calculateSuggestion();

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Shree<Text style={{ color: '#10B981' }}>Nayra</Text>Group</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'INSURANCE' && styles.activeTab]} onPress={() => { setActiveTab('INSURANCE'); setSelectedSub('LIFE'); }}>
          <MaterialCommunityIcons name="shield-check-outline" size={20} color={activeTab === 'INSURANCE' ? '#10B981' : '#94A3B8'} />
          <Text style={[styles.tabText, activeTab === 'INSURANCE' && styles.activeTabText]}>Insurance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'INVESTMENT' && styles.activeTab]} onPress={() => { setActiveTab('INVESTMENT'); setSelectedSub('SIP'); }}>
          <MaterialCommunityIcons name="trending-up" size={20} color={activeTab === 'INVESTMENT' ? '#10B981' : '#94A3B8'} />
          <Text style={[styles.tabText, activeTab === 'INVESTMENT' && styles.activeTabText]}>Investment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.calculatorSection}>
        <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="Enter Amount" placeholderTextColor="#64748B" />
        <TextInput style={styles.input} value={tenure} onChangeText={setTenure} keyboardType="numeric" placeholder="Enter Years" placeholderTextColor="#64748B" />
        <View style={styles.suggestionGlowCard}>
          <Text style={styles.suggestionLabel}>{dynamicData.label}</Text>
          <Text style={styles.suggestionValue}>{dynamicData.value}</Text>
          <Text style={{ color: '#64748B', fontSize: 12, marginTop: 6 }}>{dynamicData.tip}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F19', paddingHorizontal: 16, paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  tabContainer: { flexDirection: 'row', backgroundColor: '#161C2A', borderRadius: 12, padding: 4 },
  tab: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12 },
  activeTab: { backgroundColor: '#1E293B', borderRadius: 10, borderWidth: 1, borderColor: '#10B981' },
  tabText: { color: '#94A3B8', marginLeft: 8, fontWeight: '600' },
  activeTabText: { color: '#FFFFFF' },
  calculatorSection: { backgroundColor: '#161C2A', padding: 16, borderRadius: 16, marginTop: 24 },
  input: { backgroundColor: '#0B0F19', color: '#FFFFFF', padding: 14, borderRadius: 10, marginBottom: 16, fontSize: 16, borderWidth: 1, borderColor: '#1E293B' },
  suggestionGlowCard: { backgroundColor: '#1E293B', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.2)' },
  suggestionLabel: { color: '#94A3B8', fontSize: 13, fontWeight: '500' },
  suggestionValue: { color: '#10B981', fontSize: 26, fontWeight: 'bold', marginTop: 4 }
});