export const fakeResult = {
  emoji: '🌵',
  rarity: 'uncommon',
  nameAr: 'التين الهندي',
  nameLatin: 'Opuntia ficus-indica',
  xp: 80,
  story:
    'نبتة صبّار تونسية جاءت من المكسيك وصارت جزءاً من كل حقل وجبل. في الصيف، ثمارها الحلوة تسمى "الكرموس الهندي" — لكن احذر من أشواكها الصغيرة!',
  survival:
    'إذا ضاعت منك المياه في الصيف، الثمرة الناضجة فيها ماء حلو. اقطعها بعناية بسكين وقشرها — لكن لا تلمسها بيدك العارية.',
  heritage:
    'جدّاتنا كنّ يصنعن من بذورها زيتاً للعناية بالشعر، ومن أوراقها مرهماً للجروح. رمز للصبر والقوة في الصحراء.'
};

export const discoveries = [
  {
    id: 'd1',
    emoji: '🦎',
    nameAr: 'الورل الصحراوي',
    rarity: 'rare',
    xp: 150,
    date: 'قبل يومين',
    coords: { latitude: 36.8165, longitude: 10.1815 }
  },
  {
    id: 'd2',
    emoji: '🌿',
    nameAr: 'إكليل الجبل',
    rarity: 'common',
    xp: 40,
    date: 'أمس',
    coords: { latitude: 36.8265, longitude: 10.1915 }
  },
  {
    id: 'd3',
    emoji: '🦅',
    nameAr: 'نسر تونسي',
    rarity: 'legendary',
    xp: 500,
    date: 'اليوم',
    coords: { latitude: 36.8065, longitude: 10.1715 }
  }
];

export const badges = [
  { id: 'b1', emoji: '🌿', nameAr: 'كاشف المبتدئ',    earned: true },
  { id: 'b2', emoji: '💧', nameAr: 'محارب الظمأ',     earned: true },
  { id: 'b3', emoji: '🔥', nameAr: 'صانع النار',       earned: true },
  { id: 'b4', emoji: '👁️', nameAr: 'عين النسر',       earned: false, hint: 'امسح 20 نوعاً' },
  { id: 'b5', emoji: '🦂', nameAr: 'سيد الصحراء',     earned: false, hint: 'اكتشف 3 كائنات خطيرة' },
  { id: 'b6', emoji: '⭐', nameAr: 'أسطورة كشافة',    earned: false, hint: 'أكمل كل المهام' },
  { id: 'b7', emoji: '🌙', nameAr: 'كشاف الليل',      earned: false, hint: 'أكمل مهمة ليلية' }
];

export const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#0f2a1d' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a1a12' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#7fb685' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#f4e9d1' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#6b8e7a' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#17382a' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#7fb685' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#245041' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#0a1a12' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#c9b994' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3d6a55' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#0f2a1d' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#1a3a2a' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a1a12' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3d6a55' }] }
];
