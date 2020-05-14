# frozen_string_literal: true

describe Api::V1::GeoPointsController, type: :controller do
  describe 'GET index' do
    subject { get(:index) }

    let(:geo_point1) { instance_double(GeoPoint) }
    let(:geo_point2) { instance_double(GeoPoint) }

    let(:serialized_geo_point1) { double(:serialized_hash) }
    let(:serialized_geo_point2) { double(:serialized_hash) }

    let(:expected_result) { { geo_points: [serialized_geo_point1, serialized_geo_point2] }.to_json }

    before do
      allow(GeoPoint).to receive(:all).with(no_args).and_return([geo_point1, geo_point2])
      allow(controller).to receive(:serialize_geo_point).with(geo_point1).and_return(serialized_geo_point1)
      allow(controller).to receive(:serialize_geo_point).with(geo_point2).and_return(serialized_geo_point2)
    end

    it { is_expected.to have_http_status(:ok) }

    it 'renders json with geo points' do
      subject
      expect(response.body).to eq(expected_result)
    end
  end

  describe 'GET show' do
    subject { get(:show, params: { id: geo_point_id }) }

    let(:geo_point_id) { rand(100) }
    let(:geo_point) { instance_double(GeoPoint) }
    let(:serialized_geo_point) { double(:serialized_hash) }
    let(:expected_result) { { geo_point: serialized_geo_point }.to_json }

    before do
      allow(GeoPoint).to receive(:find).with(geo_point_id.to_s).and_return(geo_point)
      allow(controller).to receive(:serialize_geo_point).with(geo_point).and_return(serialized_geo_point)
    end

    it { is_expected.to have_http_status(:ok) }

    it 'renders json with given geo point' do
      subject
      expect(response.body).to eq(expected_result)
    end
  end

  describe 'POST create' do
    subject { post(:create, params: params) }

    let(:params) { { geo_point: { width: width, height: height } } }
    let(:width) { rand(100) }
    let(:height) { rand(100) }

    let(:geo_point) { instance_double(GeoPoint, save: saved) }

    before { allow(GeoPoint).to receive(:new).and_return(geo_point) }

    context 'when new geo point was saved' do
      let(:saved) { true }
      let(:serialized_geo_point) { double(:serialized_hash) }
      let(:expected_result) do
        {
          success: true,
          geo_point: serialized_geo_point
        }.to_json
      end

      before { allow(controller).to receive(:serialize_geo_point).with(geo_point).and_return(serialized_geo_point) }

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with newly created geo point' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end

    context 'when new geo point was not saved' do
      let(:saved) { false }
      let(:expected_result) do
        {
          success: false,
          errors: 'error message'
        }.to_json
      end

      before do
        allow(geo_point)
          .to receive_message_chain(:errors, :message)
          .with(no_args).with(no_args)
          .and_return('error message')
      end

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with error message' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end
  end

  describe 'PUT update' do
    subject { patch(:update, params: params) }

    let(:geo_point_id) { rand(100) }
    let(:params) { { id: geo_point_id, geo_point: { width: width, height: height } } }
    let(:width) { rand(100) }
    let(:height) { rand(100) }

    let(:geo_point) { instance_double(GeoPoint) }

    before do
      allow(GeoPoint).to receive(:find).with(geo_point_id.to_s).and_return(geo_point)
      allow(geo_point).to receive(:update).and_return(updated)
    end

    context 'when geo point was updated' do
      let(:updated) { true }
      let(:serialized_geo_point) { double(:serialized_hash) }
      let(:expected_result) do
        {
          success: true,
          geo_point: serialized_geo_point
        }.to_json
      end

      before { allow(controller).to receive(:serialize_geo_point).with(geo_point).and_return(serialized_geo_point) }

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with updated geo point' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end

    context 'when geo point was not updated' do
      let(:updated) { false }
      let(:expected_result) do
        {
          success: false,
          errors: 'error message'
        }.to_json
      end

      before do
        allow(geo_point)
          .to receive_message_chain(:errors, :message)
          .with(no_args).with(no_args)
          .and_return('error message')
      end

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with error message' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end
  end

  describe 'DELETE destroy' do
    subject { delete(:destroy, params: params) }

    let(:params) { { id: geo_point_id } }
    let(:geo_point_id) { rand(100) }
    let(:geo_point) { instance_double(GeoPoint, destroy: destroyed) }

    before { allow(GeoPoint).to receive(:find).with(geo_point_id.to_s).and_return(geo_point) }

    context 'when geo point was destroyed' do
      let(:destroyed) { true }
      let(:expected_result) { { success: true }.to_json }

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with success: true' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end

    context 'when geo point was not destroyed' do
      let(:destroyed) { false }
      let(:expected_result) do
        {
          success: false,
          errors: 'error message'
        }.to_json
      end

      before do
        allow(geo_point)
          .to receive_message_chain(:errors, :message)
          .with(no_args).with(no_args)
          .and_return('error message')
      end

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with error message' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end
  end
end
