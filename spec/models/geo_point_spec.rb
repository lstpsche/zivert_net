# frozen_string_literal: true

describe GeoPoint, type: :model do
  subject { geo_point }

  let(:geo_point) { build_stubbed(:geo_point) }

  describe 'callbacks' do
    describe 'after_create' do
      subject { create(:geo_point) }

      before do
        allow(GeoPoints::CreationJob).to receive(:perform_now)
        allow(Measurement).to receive(:create_initial)
      end

      it 'calls geo points creation job' do
        expect(GeoPoints::CreationJob).to receive(:perform_now)

        subject
      end

      it 'creates initial measurement for geo point' do
        expect(Measurement).to receive(:create_initial)

        subject
      end
    end

    describe 'after_update' do
      subject { geo_point.update(rad_value: rand(100)) }

      let!(:geo_point) { create(:geo_point) }

      before do
        allow(GeoPoints::CreationJob).to receive(:perform_now)
        allow(Measurement).to receive(:create_initial)
      end

      it 'calls geo points updation job' do
        expect(GeoPoints::UpdationJob).to receive(:perform_now)

        subject
      end
    end

    describe 'after_destroy' do
      subject { geo_point.destroy }

      let!(:geo_point) { create(:geo_point) }

      before do
        allow(GeoPoints::CreationJob).to receive(:perform_now)
        allow(Measurement).to receive(:create_initial)
      end

      it 'calls geo points deletion job' do
        expect(GeoPoints::DeletionJob).to receive(:perform_now)

        subject
      end
    end
  end

  describe '#json' do
    subject { super().json }

    let(:geo_point_serializer) { instance_double(GeoPointSerializer, serializable_hash: serialized_hash) }
    let(:serialized_hash) { double(:serialized_hash) }

    before { allow(GeoPointSerializer).to receive(:new).with(geo_point).and_return(geo_point_serializer) }

    it { is_expected.to eq(serialized_hash) }
  end
end
